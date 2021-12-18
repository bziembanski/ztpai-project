package bziembanski.announcement

import bziembanski.core.ServiceHelper
import bziembanski.annoucementType.AnnouncementTypeService
import bziembanski.annoucementType.AnnouncementTypes
import bziembanski.user.User
import bziembanski.user.UserService
import bziembanski.user.Users
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.javatime.CurrentDateTime
import org.jetbrains.exposed.sql.javatime.datetime

object Announcements : IntIdTable() {
    val title = varchar("title", 50)
    val description = varchar("description", 280)
    val wage = float("wage")
    val announcementType = reference("announcement_type_id", AnnouncementTypes)
    val user = reference("user_id", Users)
    val date = datetime("date").defaultExpression(CurrentDateTime())
}

class AnnouncementService {
    suspend fun createAnnouncement(announcement: Announcement): Announcement? {
        lateinit var announcementId: EntityID<Int>
        ServiceHelper.dbQuery {
            announcementId = Announcements.insert {
                it[title] = announcement.title
                it[description] = announcement.description
                it[wage] = announcement.wage
                it[announcementType] = announcement.announcementType.id
                it[user] = announcement.user.id
            } get Announcements.id
        }
        return getAnnouncementId(announcementId.value)
    }

    suspend fun getAnnouncementId(announcementId: Int): Announcement? =
        ServiceHelper.dbQuery {
            Announcements
                .innerJoin(AnnouncementTypes)
                .innerJoin(Users)
                .select { (Announcements.id eq announcementId) }
                .mapNotNull { toAnnouncement(it) }
                .singleOrNull()
        }

    suspend fun getAllAnnouncements(): List<Announcement> =
        ServiceHelper.dbQuery {
            Announcements
                .innerJoin(AnnouncementTypes)
                .innerJoin(Users)
                .selectAll()
                .mapNotNull { toAnnouncement(it) }
        }


    suspend fun getAllAnnouncementsByUserId(userId: Int): List<Announcement> =
        ServiceHelper.dbQuery {
            Announcements
                .innerJoin(Users)
                .innerJoin(AnnouncementTypes)
                .select { Announcements.user eq userId }
                .mapNotNull { toAnnouncement(it) }
        }

    suspend fun updateAnnouncement(announcement: Announcement): Announcement? {
        ServiceHelper.dbQuery {
            Announcements.update({ Announcements.id eq announcement.id }) {
                it[title] = announcement.title
                it[description] = announcement.description
                it[wage] = announcement.wage
                it[announcementType] = announcement.announcementType.id
                it[user] = announcement.user.id
            }
        }
        return getAnnouncementId(announcement.id)
    }

    suspend fun deleteAnnouncementById(announcementId: Int): Boolean =
        ServiceHelper.dbQuery {
            Announcements.deleteWhere { Announcements.id eq announcementId } > 0
        }

    companion object {
        fun toAnnouncement(row: ResultRow, withUser: Boolean = true): Announcement =
            Announcement(
                id = row[Announcements.id].value,
                title = row[Announcements.title],
                description = row[Announcements.description],
                wage = row[Announcements.wage],
                announcementType = AnnouncementTypeService.toAnnouncementType(
                    row
                ),
                user = if(withUser) UserService.toUser(row) else User(),
            )
    }

}