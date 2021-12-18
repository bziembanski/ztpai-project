package bziembanski.userRatingType


import bziembanski.core.ServiceHelper
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*

object UserRatingTypes : IntIdTable(name = "user_rating_types") {
    val name = varchar("name", 50)
}

class UserRatingTypeService {
    suspend fun createUserRatingType(userRatingType: UserRatingTypes): UserRatingType? {
        lateinit var userRatingTypeId: EntityID<Int>
        ServiceHelper.dbQuery {
            userRatingTypeId = UserRatingTypes.insert {
                it[name] = userRatingType.name
            } get UserRatingTypes.id
        }
        return getUserRatingTypeById(userRatingTypeId.value)
    }

    suspend fun getUserRatingTypeById(userRatingTypeId: Int): UserRatingType? =
        ServiceHelper.dbQuery {
            UserRatingTypes
                .select { (UserRatingTypes.id eq userRatingTypeId) }
                .mapNotNull { toUserRatingType(it) }
                .singleOrNull()
        }


    suspend fun getAllUserRatingTypes(): List<UserRatingType> =
        ServiceHelper.dbQuery {
            UserRatingTypes
                .selectAll()
                .mapNotNull { toUserRatingType(it) }
        }

    suspend fun updateUserRatingType(userRatingType: UserRatingType): UserRatingType? {
        ServiceHelper.dbQuery {
            UserRatingTypes.update({ UserRatingTypes.id eq userRatingType.id }) {
                it[name] = userRatingType.name
            }
        }
        return getUserRatingTypeById(userRatingType.id)
    }

    suspend fun deleteUserRatingTypeById(userRatingTypeId: Int): Boolean =
        ServiceHelper.dbQuery {
            UserRatingTypes.deleteWhere { UserRatingTypes.id eq userRatingTypeId } > 0
        }

    companion object {
        fun toUserRatingType(row: ResultRow): UserRatingType =
            UserRatingType(
                id = row.getOrNull(UserRatingTypes.id)?.value ?: 0,
                name = row[UserRatingTypes.name],
            )
    }
}