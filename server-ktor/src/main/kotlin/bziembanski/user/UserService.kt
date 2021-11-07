package bziembanski.user

import bziembanski.ServiceHelper.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.statements.UpdateBuilder

object Users: Table() {
  val id = integer("id")
    .autoIncrement()
    .uniqueIndex()
  val username = varchar("username", 50).uniqueIndex()
  val email = varchar("email", 255)
  val password = varchar("password", 255)
  val name = varchar("name", 255)
  val surname = varchar("surname", 255)
  val avatar = varchar("avatar", 255)
}

class UserService {
  suspend fun createUser(user: User): User? {
    var newUserId: Int? = null
    dbQuery {
      newUserId = Users.insert {
        userToUsersInQuery(it, user)
      } get Users.id
    }
    return newUserId?.let { getUserById(it) }
  }

  suspend fun getUserById(userId: Int): User? =
    dbQuery {
      Users
        .select { (Users.id eq userId) }
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
      else user.name
        .first()
        .toString()
  }

  private fun toUser(row: ResultRow): User =
    User(
      id = row[Users.id],
      username = row[Users.username],
      password_ = row[Users.password],
      email = row[Users.email],
      name = row[Users.name],
      surname = row[Users.surname],
      avatar = row[Users.avatar]
    )
}