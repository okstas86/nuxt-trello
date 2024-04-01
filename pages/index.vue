<template>
	<div class="w-full h-screen flex p-5 bg-[#33363d] overflow-x-auto">
		<div
			v-for="category in categories"
			:key="category.id"
			@drop="onDrop($event, category.id)"
			@dragover.prevent
			@dragenter.prevent
			class="droppable min-w-[280px] h-fit m-5 border-none bg-[#2b2d33] flex flex-col items-center"
		>
			<h4
				@click="startEditing(category)"
				v-if="!category.editing"
				class="w-full h-12 text-white mb-3 pt-3 text-center"
				:style="getCategoryClass(category.id)"
			>
				{{ category.title }}
			</h4>
			<input
				class="bg-gray-500 h-12 text-white mb-3 outline-none text-center"
				v-if="category.editing"
				v-model="category.editedTitle"
				@blur="stopEditing(category)"
				@keyup.enter="stopEditing(category)"
				type="text"
			/>
			<div
				v-for="item in items.filter(x => x.categoryId === category.id)"
				:key="item.id"
				@dragstart="onDragStart($event, item)"
				draggable="true"
				class="draggable bg-[#1c1d20] text-[#7c8085] w-[250px] h-[100px] mb-3 mx-auto"
			>
				<p class="m-4" @click="startEditing(item)" v-if="!item.editing">
					id: {{ item.id }}
				</p>
				<p class="mx-4" @click="startEditing(item)" v-if="!item.editing">
					{{ item.title }}
				</p>
				<input
					class="pl-2 pb-10 w-full h-[100px] bg-[#4f4e4e] text-[#a3a5a8] text-sm outline-none"
					v-if="item.editing"
					v-model="item.editedTitle"
					@blur="stopEditing(item)"
					@keydown.enter="stopEditing(item)"
					placeholder="Ввести заголовок для этой карточки"
					type="text"
				/>
				<div v-if="item.editing" class="flex ml-[-15px] w-[280px] bg-[#2b2d33]">
					<button
						@click="stopEditing(item)"
						class="flex my-3 bg-[#4f4e4e] hover:bg-[#1c1d20] mx-4 px-3 py-1.5"
					>
						<p class="text-[#7c8085] text-sm font-normal">Добавить карточку</p>
					</button>
					<button @click="stopEditing(item)">
						<img src="../assets/icons/close.svg" alt="plus" />
					</button>
				</div>
			</div>
			<div v-if="!showBtn" class="w-full hover:bg-[#1c1d20]">
				<button @click="addNewItem(category.id)" class="flex w-full my-3 ml-2">
					<img src="../assets/icons/plus.svg" alt="plus" class="mx-2" />
					<p class="text-[#7c8085] text-sm font-normal">Добавить</p>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useBoardStore } from "~/stores/boardStore"
const store = useBoardStore()

const items = ref([
	{
		id: 0,
		title: "Technical Testing",
		categoryId: 0,
		editing: false,
	},
	{
		id: 1,
		title: "Client Meeting",
		categoryId: 0,
		editing: false,
	},
	{
		id: 2,
		title: "Bug Fixing",
		categoryId: 1,
		editing: false,
	},
])
const categories = ref([
	{
		id: 0,
		title: "ON-HOLD",
		editing: false,
		color: "#fb7e46",
	},
	{
		id: 1,
		title: "IN-PPOGRESS",
		editing: false,
		color: "#2a92bf",
	},
	{
		id: 2,
		title: "NEEDS-REWIEW",
		editing: false,
		color: "#f4ce46",
	},
	{
		id: 3,
		title: "APPROVED",
		editing: false,
		color: "#00b961",
	},
])

let activeEditingItemId = null
let newItemTitle = ""
const showBtn = ref(false)

function onDragStart(e, item) {
	e.dataTransfer.dropEffect = "move"
	e.dataTransfer.effectAllowed = "move"
	e.dataTransfer.setData("itemId", item.id.toString())
}
function onDrop(e, categoryId) {
	const itemId = parseInt(e.dataTransfer.getData("itemId"))
	items.value = items.value.map(item => {
		if (item.id === itemId) item.categoryId = categoryId
		return item
	})
}

function addNewItem(categoryId) {
	showBtn.value = true
	const newItemId = items.value.length
	const newItem = {
		id: newItemId,
		title: `New Item`,
		categoryId: categoryId,
		editing: true,
		editedTitle: "",
	}
	items.value = [...items.value, newItem]
	newItemTitle = ""
}
function startEditing(item) {
	if (activeEditingItemId !== null) {
		const activeItem = items.value.find(i => i.id === activeEditingItemId)
		if (activeItem) {
			activeItem.editing = false
		}
	}
	activeEditingItemId = item.id
	showBtn.value = true
	item.editing = true
	item.editedTitle = item.title
}

function stopEditing(item) {
	showBtn.value = false
	item.editing = false

	item.title = item.editedTitle
}

function getCategoryClass(categoryId) {
	const category = categories.value.find(item => item.id === categoryId)
	return category ? { "background-color": category.color } : ""
}
</script>
