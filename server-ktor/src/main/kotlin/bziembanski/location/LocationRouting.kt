package bziembanski.location

import io.ktor.application.*
import io.ktor.response.*
import io.ktor.routing.*

fun Route.location(locationService: LocationService) {
    route("/locations") {
        get("") {
            call.respond(locationService.voivodeshipList())
        }
        get("/{voivodeshipId}") {
            call.respond(locationService.countyList(call.parameters["voivodeshipId"]!!))
        }
        get("/{voivodeshipId}/{countyId}") {
            call.respond(
                locationService.communeList(
                    call.parameters["voivodeshipId"]!!,
                    call.parameters["countyId"]!!
                )
            )
        }
        get("/{voivodeshipId}/{countyId}/{communeId}") {
            call.respond(
                locationService.localityList(
                    call.parameters["voivodeshipId"]!!,
                    call.parameters["countyId"]!!,
                    call.parameters["communeId"]!!
                )
            )
        }
    }

}