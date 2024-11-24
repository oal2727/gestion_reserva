import {
	Table as TableComponent,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { flexRender, type Table } from '@tanstack/react-table'
import { Skeleton } from '../ui/skeleton'
interface DataTableProps<TData> {
	table: Table<TData>
}

export default function DataTableSkeleton<TData>({
	table,
}: DataTableProps<TData>) {
	const columnLength = table.getAllColumns().length
	return (<>
		<div className="rounded-md border h-[480px]">
			<TableComponent>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}
										className='bg-primary text-white'
									>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{(Array(3).fill(null)).map((_, index) => (
						<TableRow
							key={index}
						>
							{(Array(columnLength).fill(null)).map((_, index) => (
								<TableCell key={index}>
									<Skeleton className={'h-6 my-[3.75px] w-full'} />
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</TableComponent>
		</div>
	</>)
}
