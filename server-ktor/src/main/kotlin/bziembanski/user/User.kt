package bziembanski.user

import kotlinx.serialization.Serializable
import org.mindrot.jbcrypt.BCrypt


@Serializable
data class User(
  val id: Int,
  val username: String,
  private val password_: String,
  val email: String,
  val name: String = "",
  val surname: String = "",
  val avatar: String = "",
  ){
  var password: String
  get() = password_
    set(value) {
    BCrypt.hashpw(value, BCrypt.gensalt())
  }
}
