package bziembanski.notifications

import bziembanski.core.ServiceHelper.dbQuery
import bziembanski.annoucementType.AnnouncementTypes
import bziembanski.announcement.AnnouncementService
import bziembanski.announcement.Announcements
import bziembanski.user.UserService
import bziembanski.user.Users
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*

object Notifications : IntIdTable() {
    val notifier = reference("notifier_id", Users)
    val notified = reference("notified_id", Users)
    val announcement = reference("announcement_id", Announcements)
    val message = text("message")
    val notificationType = varchar("notification_type", 20).nullable()
}

class NotificationService {
    suspend fun createNotification(notification: Notification) {
        dbQuery {
            Notifications.insert {
                it[message] = notification.message
                it[notificationType] = notification.notificationType?.name
                it[notifier] = notification.notifier.id
                it[notified] = notification.notified.id
                it[announcement] = notification.announcement.id
            }
        }
    }

    suspend fun getNotificationsByNotifiedUser(notifiedId: Int): List<Notification> {
        val notified = Users.alias("u1")
        val notifier = Users.alias("u2")

        return dbQuery {
            Notifications
                .innerJoin(Announcements)
                .innerJoin(AnnouncementTypes)
                .innerJoin(
                    notified,
                    { Notifications.notified },
                    { notified[Users.id] })
                .innerJoin(
                    notifier,
                    { Notifications.notifier },
                    { notifier[Users.id] })
                .select { Notifications.notified eq notifiedId }
                .mapNotNull { toNotification(it, notified, notifier) }
        }
    }

    companion object {
        fun toNotification(
            row: ResultRow,
            notified: Alias<Users>,
            notifier: Alias<Users>
        ): Notification {
            return Notification(
                id = row[Notifications.id].value,
                message = row[Notifications.message],
                notificationType = row[Notifications.notificationType]?.let {
                    NotificationType.valueOf(
                        it
                    )
                },
                notified = UserService.toUserFromAlias(row, notified),
                notifier = UserService.toUserFromAlias(row, notifier),
                announcement = AnnouncementService.toAnnouncement(row, false)
            )
        }

    }
}