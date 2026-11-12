
from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

import jwt

from app.db.database import get_db
from app.db.models import User
from app.core.security import decode_access_token


def get_current_user(
    request: Request,
    db: Session = Depends(get_db)
):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Please sign in to continue."
        )

    try:
        payload = decode_access_token(token)
        user_id = payload.get("sub")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid session.")

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=401,
            detail="Session expired or invalid. Please sign in again."
        )

    user = db.get(User, user_id)

    if not user or not user.is_active:
        raise HTTPException(
            status_code=401,
            detail="User account is unavailable."
        )

    return user
