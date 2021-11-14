package bziembanski.annoucementType

import kotlinx.serialization.Serializable

@Serializable
data class AnnouncementType(
    val id: Int = 0,
    val name: String
)