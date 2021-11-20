package bziembanski.userRating

import bziembanski.user.User
import bziembanski.userRatingType.UserRatingType
import kotlinx.serialization.Serializable

@Serializable
data class UserRating(
    val id: Int = 0,
    val value: Float = 0f,
    val userRatingType: UserRatingType = UserRatingType(),
    val user: User = User(),
)
