import { useEffect, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
 
 
export type Product = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  role: "admin" | "client",
  isActivated: boolean,
  isDeleted: boolean,
}
 
export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "firstName",
    header: "First name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: "Last name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
  },{
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("username")}</div>,
  },{
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },{
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role")}</div>
    ),
  },{
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original
 
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// const formSchema = z.object({
//   name: z.string().min(2, {message: "Product name must be at least 2 characters.",}),
//   description: z.string().min(1, {message: "Description is required",}),
//   price: z.number({required_error: "Price is required", invalid_type_error: "Price must be a number"}),
//   category: z.enum(['electronics', 'health-and-fitness', 'Furnitures', 'accessories', 'clothing']),
//   images: z.string().array().nonempty(),
//   stocks: z.number({required_error: "Stocks is required", invalid_type_error: "Stocks must be a number"}),
// })
interface AddProduct {
  name?: string
  description?: string
  price?: number
  stocks?: number
  category?: 'electronics' | 'health-and-fitness' | 'Furnitures' | 'accessories' | 'clothing'
  images?: string[]
}


const Products = () => {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([])
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { toast } = useToast()
  const [addProductForm, setAddProductForm] = useState<AddProduct>();

  const handleAddProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData = { ...addProductForm };
    newFormData[fieldName] = fieldValue
    setAddProductForm(newFormData)
    console.log(addProductForm)
  }

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getProducts = async() => {
      try {
        const response: any = await axiosPrivate.get(`/`, { 
          signal: controller.signal
        });
        setData(response.data)
        console.log(response.data)

        isMounted && setData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();

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
          Products
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a product</DialogTitle>
            </DialogHeader>
            <form action="POST" enctype='multipart/form-data'>
            <Label htmlFor="name">Name: </Label>
            <Input onChange={handleAddProductChange} name="name" className="my-1"/>

            <Label htmlFor="description">Description: </Label>
            <Textarea name="description" className="my-1"/>

           
            <div className="flex gap-2">
              <div>
                <Label htmlFor="price">Price: </Label>
                <Input onChange={handleAddProductChange} name="price" type="number" pattern="^[1-9]\d+$" className="my-1"/>
              </div>
              <div>
                <Label htmlFor="stocks">Stocks: </Label>
                <Input onChange={handleAddProductChange} name="stocks" type="number" pattern="^[1-9]\d+$" className="my-1"/>
             </div>
            </div>

            <div className="flex gap-2">
              <div>
                <Label htmlFor="category">Category: </Label>
                <Select name="category">
                  <SelectTrigger className="w-[185px] my-1 font-medium">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="font-medium" value="accessories">Accessories</SelectItem>
                    <SelectItem className="font-medium" value="health-and-fitness">Health & Fitness</SelectItem>
                    <SelectItem className="font-medium" value="electronics">Electronics</SelectItem>
                    <SelectItem className="font-medium" value="furnitures">Furnitures</SelectItem>
                    <SelectItem className="font-medium" value="clothing">Clothing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid w-1/2 max-w-sm items-center gap-1.5 my-1">
                <Label htmlFor="images">Picture</Label>
                <Input onChange={handleAddProductChange} id="images" name="images" type="file" multiple/>
              </div>

            </div>
            <Button type="submit" onClick={(e)=>{e.preventDefault(); console.log(addProductForm)}}>Save changes</Button>
            </form>
            
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
        
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                placeholder="Filter emails..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("email")?.setFilterValue(event.target.value)
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

export default Products