import { useEffect, useState } from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from '../ui/use-toast'
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { axiosPrivate } from "@/api/axios"
import { Badge } from "../ui/badge"
import moment from 'moment'
 
 
export type Orders = {
  orderId: number,
  productId: number,
  userId: number,
  status: 'to_pack'| 'in_logistics'| 'shipped'| 'out_for_delivery'| 'delivered'| 'cancelled',
  itemQuantity: number,
  shippingAmount: number,
  subtotal: number,
  email: string,
  createdAt: string,
  shippingAddress: string,
  paymentMethod: string,
  products: Product,
}
export type Product = {
  id: number,
  name: string,
  description: string,
  price: number,
  stocks: number,
  category: "admin" | "client",
  quantitySold: number,
  isDeleted: boolean,
}



 
export const columns: ColumnDef<Orders>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value:any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize pl-6">{row.getValue("orderId")}</div>,
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{`${row.original.email}`}</div>,
  },
  {
    accessorKey: "shippingAddress",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize max-w-prose truncate">{`${(row.original.shippingAddress)}`}</div>
    ),
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      let badge = <></>

      switch (row.original.status) {
        case "to_pack":
          badge = <Badge className="bg-yellow-500 text-white" variant="outline">To Pack</Badge>;
          break;
        case "shipped":
          badge = <Badge className="bg-blue-600 text-white" variant="outline">Shipped</Badge>;
          break;
        case "in_logistics":
          badge = <Badge className="bg-sky-300 text-white" variant="outline">Logistics</Badge>;
          break;
        case "out_for_delivery":
          badge = <Badge className="bg-green-400 text-white" variant="outline">Out for Delivery</Badge>;
          break;
        case "delivered":
          badge = <Badge className="bg-green-600 text-white" variant="outline">Delivered</Badge>;
          break;
        case "cancelled":
          badge = <Badge variant="destructive">Cancelled</Badge>;
          break;
        default:
          break;
      }
      return(
        badge
      )
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => (
      <div className="uppercase pl-6">{`${(row.original.paymentMethod)}`}</div>
    ),
  },
  {
    accessorKey: "Total",
    header: "Total",
    cell: ({ row }) => (
      <div className="capitalize">{`$${(row.original.subtotal)+(row.original.shippingAmount)}`}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const formattedDate = moment(row.original.createdAt).format(' MM/DD/YYYY');

      return(
        <div>{`${formattedDate}`}</div>
      )},
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original
      const { toast } = useToast();
      const [statusForm, setStatusForm] = useState({});

      const handleStatusSubmit = async(id:number) => {
        axiosPrivate
          .patch('order/edit/status/'+ id, statusForm)
          .then((response) => {
            console.log(response.data);
            window.location.reload()
            toast({
              title: "Updated Successfully",
              description: response.data.message,
            })
          })
          .catch((error) => {
            console.error(error);
          });
          console.log(id);
      }
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger className="hover:bg-slate-200 w-full p-1.5 text-sm text-left rounded-sm transition-colors">Change Status</DialogTrigger>
              <DialogContent className="flex flex-col">
                <Label>Order Status</Label>
              <Select defaultValue={order.status} onValueChange={(value:string)=>{setStatusForm({status: value})}}>
                <SelectTrigger className="w-[280px] m-1">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="to_pack">To Pack</SelectItem>
                    <SelectItem value="in_logistics">In Logistics</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="out_for_delivery">Out For Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                <DialogFooter>
                  <Button variant={"default"} onClick={()=>handleStatusSubmit(order.orderId)}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]


const Logs = () => {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([])
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getOrders = async() => {
      try {
        const response: any = await axiosPrivate.get(`/orders/unique`, { 
          signal: controller.signal
        });
        setData(response.data)
        console.log(response.data)

        isMounted && setData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getOrders();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

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
  return (
    <>
    <div className="container py-24">
      <div className="flex justify-between border-b">
        <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-8">
          Orders
        </h2>
        
      </div>
        
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                placeholder="Filter id..."
                value={(table.getColumn("orderId")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
                />
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
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
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
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
                    {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
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
                        <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                        >
                        No results.
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
    </div>
    </>
    
  )
}

export default Logs