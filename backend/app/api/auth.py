
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from sqlalchemy.exc import IntegrityError

from app.db.database import get_db
from app.db.models import User, Organization, OrganizationMember
from app.schemas.auth import (
    RegisterRequest, LoginRequest, AuthResponse, UserResponse
)
from app.core.security import (
    hash_password, verify_password, create_access_token
)
from app.core.config import settings
from app.api.dependencies import get_current_user


router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])


def set_auth_cookie(response: Response, token: str, remember_me: bool):
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax",
        max_age=(
            7 * 24 * 60 * 60
            if remember_me
            else settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60
        ),
        path="/"
    )


@router.post("/register", response_model=AuthResponse, status_code=201)
def register(
    payload: RegisterRequest,
    response: Response,
    db: Session = Depends(get_db)
):
    email = payload.email.strip().lower()

    existing_user = db.scalar(
        select(User).where(func.lower(User.email) == email)
    )

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists."
        )

    user = User(
        full_name=payload.full_name.strip(),
        email=email,
        password_hash=hash_password(payload.password)
    )

    organization = Organization(
        name=f"{payload.full_name.strip()}'s Workspace"
    )

    try:
        db.add(user)
        db.add(organization)
        db.flush()

        membership = OrganizationMember(
            user_id=user.id,
            organization_id=organization.id,
            role="owner"
        )

        db.add(membership)
        db.commit()
        db.refresh(user)

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="This email may already be registered."
        )

    token = create_access_token(str(user.id))
    set_auth_cookie(response, token, True)

    return AuthResponse(
        message="Account created successfully.",
        user=UserResponse(
            id=str(user.id),
            full_name=user.full_name,
            email=user.email,
            is_active=user.is_active
        )
    )


@router.post("/login", response_model=AuthResponse)
def login(
    payload: LoginRequest,
    response: Response,
    db: Session = Depends(get_db)
):
    email = payload.email.strip().lower()

    user = db.scalar(
        select(User).where(func.lower(User.email) == email)
    )

    if not user or not verify_password(
        payload.password,
        user.password_hash if user else ""
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="Your account is disabled."
        )

    token = create_access_token(
        str(user.id),
        payload.remember_me
    )

    set_auth_cookie(response, token, payload.remember_me)

    return AuthResponse(
        message="Login successful.",
        user=UserResponse(
            id=str(user.id),
            full_name=user.full_name,
            email=user.email,
            is_active=user.is_active
        )
    )


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        httponly=True,
        secure=settings.COOKIE_SECURE,
        samesite="lax",
        path="/"
    )

    return {"message": "Logged out successfully."}


@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user)
):
    return UserResponse(
        id=str(current_user.id),
        full_name=current_user.full_name,
        email=current_user.email,
        is_active=current_user.is_active
    )
