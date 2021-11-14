package bziembanski.filters

import kotlinx.serialization.Serializable

@Serializable
data class SliderDataType(
    val min: Int,
    val max: Int,
    val step: Int,
    val value: Pair<Int, Int>
)

@Serializable
data class SliderFilter(
    override val type: String,
    override val name: String,
    override val data: SliderDataType
): Filter()
