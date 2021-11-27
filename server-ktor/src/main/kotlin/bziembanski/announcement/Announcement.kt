package bziembanski.announcement

import bziembanski.annoucementType.AnnouncementType
import bziembanski.user.User
import kotlinx.serialization.Contextual
import kotlinx.serialization.KSerializer
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import java.util.*

@Serializable
data class Announcement(
    val id: Int = 0,
    val title: String = "",
    val description: String = "",
    val wage: Float = 0.0F,
    val announcementType: AnnouncementType = AnnouncementType(),
    var user: User = User(),
    @Serializable(DateSerializer::class) var date: Date = Date(),
)

object DateSerializer: KSerializer<Date>{
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("Date", PrimitiveKind.LONG)

    override fun deserialize(decoder: Decoder): Date {
        return Date(decoder.decodeLong())
    }

    override fun serialize(encoder: Encoder, value: Date) {
        encoder.encodeLong(value.time)
    }

}
