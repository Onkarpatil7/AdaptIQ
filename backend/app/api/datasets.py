import uuid
from pathlib import Path

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException,
)

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import Dataset, OrganizationMember
from app.api.dependencies import get_current_user


router = APIRouter(
    prefix="/api/v1/datasets",
    tags=["Datasets"]
)

# Private storage directory
STORAGE_DIR = (
    Path(__file__).resolve().parents[2]
    / "storage"
    / "uploads"
)

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB

ALLOWED_EXTENSIONS = {
    ".csv",
    ".xlsx",
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
}

SIGNATURES = {
    ".xlsx": lambda b: b.startswith(b"PK\x03\x04"),
    ".pdf": lambda b: b.startswith(b"%PDF-"),
    ".jpg": lambda b: b.startswith(b"\xff\xd8\xff"),
    ".jpeg": lambda b: b.startswith(b"\xff\xd8\xff"),
    ".png": lambda b: b.startswith(b"\x89PNG\r\n\x1a\n"),
}


@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    # 1. Validate filename and extension
    if not file.filename:
        raise HTTPException(400, "Filename is required")

    original_filename = Path(file.filename).name

    extension = Path(original_filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            400,
            "Unsupported file format"
        )

    # 2. Find user's organization membership
    membership = (
        db.query(OrganizationMember)
        .filter(
            OrganizationMember.user_id == current_user.id
        )
        .order_by(OrganizationMember.created_at.asc())
        .first()
    )

    if not membership:
        raise HTTPException(
            403,
            "You do not belong to an organization"
        )

    organization_id = membership.organization_id

    # 3. Generate a unique storage filename
    dataset_id = uuid.uuid4()

    stored_filename = f"{dataset_id}{extension}"

    organization_dir = STORAGE_DIR / str(organization_id)

    organization_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    file_path = organization_dir / stored_filename

    first_chunk = b""
    total_size = 0

    try:

        # 4. Save file in chunks
        with open(file_path, "wb") as destination:

            while True:

                chunk = await file.read(1024 * 1024)

                if not chunk:
                    break

                total_size += len(chunk)

                if total_size > MAX_FILE_SIZE:
                    raise HTTPException(
                        413,
                        "Maximum file size is 20 MB"
                    )

                if not first_chunk:
                    first_chunk = chunk[:32]

                destination.write(chunk)

        if total_size == 0:
            raise HTTPException(400, "Empty files are not allowed")

        # 5. Validate file signature for binary formats
        signature_validator = SIGNATURES.get(extension)

        if signature_validator and not signature_validator(first_chunk):
            raise HTTPException(
                400,
                "File content does not match its extension"
            )

        # Basic CSV text validation
        if extension == ".csv":
            with open(file_path, "rb") as uploaded:
                sample = uploaded.read(8192)

            if b"\x00" in sample:
                raise HTTPException(400, "Invalid CSV file")

            try:
                sample.decode("utf-8-sig")
            except UnicodeDecodeError:
                raise HTTPException(
                    400,
                    "CSV must use UTF-8 encoding in this MVP"
                )

        # 6. Save metadata in PostgreSQL
        dataset = Dataset(
            id=dataset_id,
            organization_id=organization_id,
            uploaded_by=current_user.id,
            original_filename=original_filename[:255],
            stored_filename=stored_filename,
            file_type=extension.lstrip("."),
            mime_type=file.content_type,
            file_size=total_size,
            storage_path=str(file_path),
            processing_status="uploaded",
        )

        db.add(dataset)
        db.commit()
        db.refresh(dataset)

        return {
            "message": "File uploaded successfully",
            "dataset_id": str(dataset.id),
            "filename": dataset.original_filename,
            "file_type": dataset.file_type,
            "file_size": dataset.file_size,
            "status": dataset.processing_status,
        }

    except Exception:
        db.rollback()

        if file_path.exists():
            file_path.unlink()

        raise

    finally:
        await file.close()