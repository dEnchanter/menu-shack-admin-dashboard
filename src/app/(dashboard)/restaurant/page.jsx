'use client'

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CardContent, Card } from "@/components/ui/card"
import { SearchIcon } from "@/components/Icons"
import { Endpoint } from "@/util/constants"
import useSWR from 'swr'
import { useToast } from "@/components/ui/use-toast"
import instance from "@/util/axios"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loading } from '@/components/Icons';
import { formatDateAndTime } from "@/helper/formatDateTime"
import { useRouter } from "next/navigation"

const Page = () => {

  const [key, setKey] = useState(() => `${Endpoint.FETCH_ALL_USERS}?t=${new Date().getTime()}`);

  useEffect(() => {
    setKey(`${Endpoint.FETCH_ALL_USERS}?t=${new Date().getTime()}`);
  }, []);

  const { data: restaurants, isValidating: tableIsValidating, error } = useSWR(key, fetcher);

  const { toast } = useToast();

  if (error) {
    toast({
      variant: "destructive",
      description: error.message,
    });
  }
  
  async function fetcher(url) {
    try {
      const response = await instance.get(url);
      const payload = response.data;
      if (payload && payload.status == true) {
        const restaurants = payload.data.filter(user => user.user_type === 'restaurant');
        return restaurants;
      } else if (payload && payload.status == false) {
        toast({
          variant: "destructive",
          description: payload.message,
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: error.response?.data?.message || "An error occurred while fetching data.",
      });
      // throw new Error(error.response?.data?.message || "An error occurred while fetching data.");
    }
  }

  const columns = [
    {
      header: 'S/N',
      cell: info => info.row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'contact_number',
      header: 'Phone',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: info => info.getValue(),
    },
    {
      accessorKey: 'user_type',
      header: 'Role',
      cell: info => (
        <Badge variant="secondary">{info.getValue()}</Badge>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Date Created',
      cell: info => formatDateAndTime(info.getValue())
    },
  ];

  const DataTable = ({ data, columns }) => {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState(
      []
    )
    const [columnVisibility, setColumnVisibility] =
      useState({})
    const [rowSelection, setRowSelection] = useState({})
   
    const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    })

    const router = useRouter();

    const handleRowClick = (row) => {
      // console.log("row", row?.original.id)
      router.push(`/restaurant/${row?.original.id}`);
    };
  
   
    return (
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue()) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="px-4 py-3">
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
            <TableBody className="font-medium">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    className={index % 2 === 0 ? 'bg-white cursor-pointer' : 'bg-gray-50 cursor-pointer'}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => handleRowClick(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    {!data.length && tableIsValidating && (
                        <div className="text-center p-4 text-sm h-14">
                          <span>
                            Loading page
                            <span className="tracking-widest">...</span>
                          </span>
                          <div className="inline-block ml-2">
                            <Loading h="w-4" />
                          </div>
                        </div>
                      )}
                      {!data.length && !tableIsValidating && (
                        <div className="text-center p-4 text-zinc-200 text-sm h-14">
                          <span>No record found</span>
                        </div>
                      )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  
  };

  return (
    <div className="bg-white shadow-xl rounded-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold tracking-wide uppercase">Restaurants</h1>
        <Button
          className="bg-[#0f2e33] hover:bg-[#0f2e33]/90 text-white font-semibold py-2 px-4 rounded">
          + Add a New Restaurant
        </Button>
      </div>
      <Card className="">
        <CardContent>
          <div className="flex justify-between items-center mb-4 my-4">
            <div className="flex space-x-2 items-center">
              <label className="whitespace-nowrap" htmlFor="show-entries">
                Show
              </label>
              <Select>
                <SelectTrigger id="show-entries">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <label className="whitespace-nowrap" htmlFor="show-entries">
                entries
              </label>
            </div>
            <div className="relative">
              <Input className="pr-8" placeholder="Search:" type="search" />
              <SearchIcon
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            <DataTable
              columns={columns} 
              data={restaurants || []}
              tableDataIsValidating={tableIsValidating}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page