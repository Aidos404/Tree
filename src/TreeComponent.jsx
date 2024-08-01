import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'

function buildTree(items) {
	const map = new Map()
	const roots = []

	items.forEach((item) => {
		map.set(item.id, { ...item, children: [] })
	})

	items.forEach((item) => {
		const node = map.get(item.id)
		if (item.parent_id === null) {
			roots.push(node)
		} else {
			const parent = map.get(item.parent_id)
			if (parent) {
				parent.children.push(node)
			}
		}
	})

	return roots
}

async function fetchData() {
	const response = await axios.get(
		'https://64b4c8450efb99d862694609.mockapi.io/tree/items'
	)
	return response.data
}

function TreeNode({ node }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div style={{ marginLeft: '20px' }}>
			<div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
				{node.title}
			</div>
			{isOpen && node.children && (
				<div>
					{node.children.map((child) => (
						<TreeNode key={child.id} node={child} />
					))}
				</div>
			)}
		</div>
	)
}

function TreeComponent() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['treeItems'],
		queryFn: fetchData,
	})

	if (isLoading) return <div>Загрузка...</div>
	if (error) return <div>Ошибка: {error.message}</div>

	const treeData = data ? buildTree(data) : []

	return (
		<div>
			<h1>Элементы дерева</h1>
			{treeData.map((node) => (
				<TreeNode key={node.id} node={node} />
			))}
		</div>
	)
}

export default TreeComponent
