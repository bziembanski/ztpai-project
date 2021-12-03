package bziembanski.notifications

import bziembanski.announcement.Announcement
import bziembanski.user.User
import kotlinx.serialization.Serializable

enum class NotificationType{
    QUESTION, ANSWER
}

@Serializable
data class Notification(
    val id: Int = 0,
    val notifier: User = User(),
    val notified: User = User(),
    val announcement: Announcement = Announcement(),
    val message: String = "",
    val notificationType: NotificationType? = null
)
