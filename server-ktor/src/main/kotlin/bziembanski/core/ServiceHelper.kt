package bziembanski.core

import kotlinx.coroutines.asCoroutineDispatcher
import kotlinx.coroutines.withContext
import org.jetbrains.exposed.sql.transactions.transaction
import java.util.concurrent.Executors
import kotlin.coroutines.CoroutineContext

object ServiceHelper {
    private val dispatcher: CoroutineContext

    init {
        dispatcher = Executors
            .newFixedThreadPool(5)
            .asCoroutineDispatcher()
    }

    suspend fun <T> dbQuery(block: () -> T): T =
        withContext(dispatcher) {
            transaction {
                block()
            }
        }
}