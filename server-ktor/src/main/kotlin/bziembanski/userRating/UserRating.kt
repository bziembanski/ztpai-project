package bziembanski.userRating

import kotlinx.serialization.Serializable

@Serializable
data class UserRating(
    val id: Int = 0,
    val value: Float = 0f,
    val userRatingType: Int = 0,
    val user: Int = 0,
)
