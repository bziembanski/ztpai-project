package bziembanski

import bziembanski.configuration.*
import io.ktor.application.*

fun main(args: Array<String>): Unit =
    io.ktor.server.netty.EngineMain.main(args)

@Suppress("unused") // application.conf references the main function. This annotation prevents the IDE from marking it as unused.
fun Application.module() {
    configureDatabase(environment)
    configureSecurity()
    configureRouting()
    configureHTTP()
    configureSerialization()
}