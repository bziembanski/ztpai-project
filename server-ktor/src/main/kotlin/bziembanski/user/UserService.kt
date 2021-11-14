package bziembanski.user

import bziembanski.ServiceHelper.dbQuery
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.UpdateBuilder

object Users : IntIdTable() {
    val username = varchar("username", 50).uniqueIndex()
    val email = varchar("email", 255)
    val password = varchar("password", 255)
    val name = varchar("name", 255)
    val surname = varchar("surname", 255)
    val avatar = varchar("avatar", 255)
}

class UserService {
    suspend fun createUser(user: User): User? {
        dbQuery {
            Users.insert {
                userToUsersInQuery(it, user)
            }
        }
        return getUserByUsername(user.username)
    }

    suspend fun getUserById(userId: Int): User? =
        dbQuery {
            Users
                .select { (Users.id eq userId) }
                .mapNotNull { toUser(it) }
                .singleOrNull()
        }

    suspend fun getUserByUsername(username: String): User? =
        dbQuery {
            Users
                .select { (Users.username eq username) }
                .mapNotNull { toUser(it) }
                .singleOrNull()
        }

    suspend fun getAllUsers(): List<User> =
        dbQuery {
            Users
                .selectAll()
                .mapNotNull { toUser(it) }
        }

    suspend fun updateUser(user: User): User? {
        dbQuery {
            Users.update({ Users.id eq user.id }) {
                userToUsersInQuery(it, user)
            }
        }
        return getUserById(user.id)
    }

    suspend fun deleteUserById(userId: Int): Boolean =
        dbQuery {
            Users.deleteWhere { Users.id eq userId } > 0
        }

    private fun userToUsersInQuery(it: UpdateBuilder<Int>, user: User) {
        it[Users.username] = user.username
        it[Users.email] = user.email
        it[Users.password] = user.password
        it[Users.name] = user.name
        it[Users.surname] = user.surname
        it[Users.avatar] =
            if (user.avatar.isNotBlank() and user.avatar.isNotEmpty()) user.avatar
            else if (user.name.isNotBlank() and user.name.isNotEmpty()) user.name
                .first()
                .toString()
            else user.username
                .first()
                .toString()
    }

    private fun toUser(row: ResultRow): User =
        User(
            id = row[Users.id].value,
            username = row[Users.username],
            email = row[Users.email],
            name = row[Users.name],
            surname = row[Users.surname],
            avatar = row[Users.avatar]
        )
}