package bziembanski.category

import bziembanski.core.ServiceHelper.dbQuery
import org.jetbrains.exposed.dao.id.IntIdTable
import org.jetbrains.exposed.sql.*

object Categories : IntIdTable() {
    val name = varchar("name", 50).uniqueIndex()
}

class CategoryService {
    suspend fun createCategory(category: Category): Category? {
        val categoryId = dbQuery {
            Categories.insert {
                it[name] = category.name
            } get Categories.id
        }

        return getCategoryById(categoryId.value)
    }

    suspend fun getCategoryById(categoryId: Int): Category? =
        dbQuery {
            Categories
                .select { (Categories.id eq categoryId) }
                .mapNotNull { toCategory(it) }
                .singleOrNull()
        }

    suspend fun getAllCategories(): List<Category> =
        dbQuery {
            Categories
                .selectAll()
                .mapNotNull { toCategory(it) }
        }

    suspend fun updateCategory(category: Category): Category? {
        dbQuery {
            Categories.update({ Categories.id eq category.id }) {
                it[name] = category.name
            }
        }
        return getCategoryById(category.id)
    }

    suspend fun deleteCategoryById(categoryId: Int): Boolean =
        dbQuery {
            Categories.deleteWhere { Categories.id eq categoryId } > 0
        }

    private fun toCategory(row: ResultRow): Category = Category(
        id = row[Categories.id].value,
        name = row[Categories.name]
    )
}