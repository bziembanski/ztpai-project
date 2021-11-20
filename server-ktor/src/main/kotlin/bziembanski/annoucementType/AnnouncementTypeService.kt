package bziembanski.annoucementType

import bziembanski.ServiceHelper
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*


object AnnouncementTypes : IntIdTable(name="announcement_types") {
    val name = varchar("name", 50).uniqueIndex()
}

class AnnouncementTypeService {
    suspend fun createAnnouncementType(announcementType: AnnouncementType): AnnouncementType? {
        val announcementTypeId = ServiceHelper.dbQuery {
            AnnouncementTypes.insert {
                it[name] = announcementType.name
            } get AnnouncementTypes.id
        }

        return getAnnouncementTypeById(announcementTypeId.value)
    }

    suspend fun getAnnouncementTypeById(announcementTypeId: Int): AnnouncementType? =
        ServiceHelper.dbQuery {
            AnnouncementTypes
                .select { (AnnouncementTypes.id eq announcementTypeId) }
                .mapNotNull { toAnnouncementType(it) }
                .singleOrNull()
        }

    suspend fun getAllAnnouncementTypes(): List<AnnouncementType> =
        ServiceHelper.dbQuery {
            AnnouncementTypes
                .selectAll()
                .mapNotNull { toAnnouncementType(it) }
        }

    suspend fun updateAnnouncementType(
        announcementType: AnnouncementType
    ): AnnouncementType? {
        ServiceHelper.dbQuery {
            AnnouncementTypes.update(
                { AnnouncementTypes.id eq announcementType.id }
            ) {
                it[name] = announcementType.name
            }
        }
        return getAnnouncementTypeById(announcementType.id)
    }

    suspend fun deleteAnnouncementTypeById(announcementTypeId: Int): Boolean =
        ServiceHelper.dbQuery {
            AnnouncementTypes.deleteWhere {
                AnnouncementTypes.id eq announcementTypeId
            } > 0
        }

    companion object{
        fun toAnnouncementType(row: ResultRow): AnnouncementType =
            AnnouncementType(
                id = row[AnnouncementTypes.id].value,
                name = row[AnnouncementTypes.name]
            )
    }

}