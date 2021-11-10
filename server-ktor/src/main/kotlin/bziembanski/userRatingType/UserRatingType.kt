package bziembanski.userRatingType

import kotlinx.serialization.Serializable

@Serializable
data class UserRatingType(
    val id: Int = 0,
    val name: String = "",
)