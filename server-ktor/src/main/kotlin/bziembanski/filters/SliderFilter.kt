package bziembanski.filters

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class SliderDataType(
    val min: Int,
    val max: Int,
    val step: Int,
    val value: Pair<Int, Int>
)

@Serializable
@SerialName("slider")
data class SliderFilter(
    override val name: String,
    override val data: SliderDataType
) : Filter()