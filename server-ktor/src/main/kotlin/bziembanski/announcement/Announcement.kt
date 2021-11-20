package bziembanski.announcement

import bziembanski.annoucementType.AnnouncementType
import bziembanski.user.User
import kotlinx.serialization.Serializable

@Serializable
data class Announcement(
    val id: Int = 0,
    val title: String = "",
    val description: String = "",
    val wage: Float = 0.0F,
    val announcementType: AnnouncementType = AnnouncementType(),
    var user: User = User(),
)
