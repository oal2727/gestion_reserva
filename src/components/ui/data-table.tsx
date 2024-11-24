'use client'

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from './data-table-pagination'
import { cn } from '@/lib/utils'
import DataTableSkeleton from '../ui-extend/data-table-eskeleton'


interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
	classNameTable?: string
	filters?: React.ReactNode
	actions?: React.ReactNode
	isLoading: boolean
}

export function DataTable<TData, TValue>({
	columns,
	data,
	classNameTable,
	filters,
	isLoading,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div className="space-y-2	">
			<div className="flex flex-col lg:flex-row lg:items-center space-y-2
			my-4
			lg:space-y-0 lg:justify-between">
				<div className="flex lg:flex-1 flex-col lg:flex-row space-y-2 lg:space-y-0 lg:items-center lg:space-x-2">
					{filters}
				</div>
				<div className="flex space-x-2">
				</div>
			</div>
			{isLoading && (<DataTableSkeleton table={table} />)}
			{!isLoading && <div className={cn('rounded-md border ' + classNameTable)}>
				{
					!isLoading && (
						<Table className=''>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header,index) => {
											return (
												<TableHead key={index}
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
							<TableBody className='overflow-x-auto'>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && 'selected'}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center">
										Sin resultados
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					)
				}
			</div>}
			{!isLoading && <DataTablePagination table={table}/>}
		</div>
	)
}
