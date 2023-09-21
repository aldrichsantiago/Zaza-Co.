import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react"
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
import { ArrowUpDown, ChevronDown, Cross, MoreHorizontal, X } from "lucide-react"
 
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
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from '../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import axios from "@/api/axios"
import { DialogClose } from "@radix-ui/react-dialog"
 
 
export type Product = {
  id: string,
  name: string,
  description: string,
  price: number,
  stocks: number,
  category: "admin" | "client",
  quantitySold: number,
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize max-w-prose truncate">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("price")}</div>
    ),
  },
  {
    accessorKey: "stocks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stocks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("stocks")}</div>,
  },
  {
    accessorKey: "quantitySold",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity Sold
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("quantitySold")}</div>,
  },{
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original
      const navigate = useNavigate();
      const { toast } = useToast();
      const [editProductForm, setEditProductForm] = useState({});

      const handleDelete = async(id:string) => {
        axios
          .patch('/delete/product/'+id, {id})
          .then((response) => {
            console.log(response.data);
            navigate(0)
          })
          .catch((error) => {
            console.error(error);
          });
          console.log(id);
      }

      const handleEditProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;
        const newFormData: any = { ...editProductForm };
        fieldName ? newFormData[fieldName] = fieldValue : ""
        setEditProductForm(newFormData)
        console.log(editProductForm)
      }

      const handleEditProductSubmit = async(id:string) => {
        axios
          .patch('/edit/product/'+ id, editProductForm)
          .then((response) => {
            console.log(response.data);
            navigate(0);
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
            <Dialog>
              <DialogTrigger className="hover:bg-slate-100 w-full p-1.5 text-sm text-left rounded-sm transition-colors">Edit Product Information</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Product Information</DialogTitle>
                </DialogHeader>
                <form  method="patch" onSubmit={()=>handleEditProductSubmit(product.id)}>
                  <Label htmlFor="name">Name: </Label>
                  <Input onChange={handleEditProductChange} name="name" className="my-1" defaultValue={product.name}/>
                  <Label htmlFor="description">Description: </Label>
                  <Textarea onChange={(e: React.ChangeEvent<HTMLTextAreaElement> )=>setEditProductForm({...editProductForm, description: e.target.value})} name="description" className="my-1" defaultValue={product.description}/>
                  <div className="flex gap-2 justify-between">
                    <div>
                      <Label htmlFor="price">Price: </Label>
                      <Input onChange={handleEditProductChange} name="price" type="number" pattern="^[1-9]\d+$" className="my-1" min={0} max={99999} defaultValue={product.price}/>
                    </div>
                    <div>
                      <Label htmlFor="stocks">Stocks: </Label>
                      <Input onChange={handleEditProductChange} name="stocks" type="number" pattern="^[1-9]\d+$" className="my-1" min={0} max={99999} defaultValue={product.stocks}/>
                    </div>
                      <div>
                        <Label htmlFor="category">Category: </Label>
                        <Select name="category" defaultValue={product.category} onValueChange={(value:string )=>setEditProductForm({...editProductForm, category: value})}>
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
                  </div>
                  <div className="flex justify-end">
                  <Button className="my-4" variant={"default"} type="submit">Save changes</Button>

                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Change Product Images</DropdownMenuItem>
            <Dialog>
              <DialogTrigger className="hover:bg-red-500 hover:text-white w-full p-1.5 text-sm text-left rounded-sm transition-colors">Delete Product</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete this product?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  This action cannot be undone
                </DialogDescription>
                <DialogFooter>
                  <DialogClose>
                    <Button aria-label="Close" variant={"outline"}>Cancel</Button>
                  </DialogClose>
                  <Button onClick={()=>handleDelete(product.id)} variant={"destructive"}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
  category?: 'electronics' | 'health-and-fitness' | 'Furnitures' | 'accessories' | 'clothing' | string
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
  const [selectedFiles, setSelectedFiles]: any = useState([]);
  const [message, setMessage] = useState('');

  const handleAddProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newFormData: any = { ...addProductForm };
    fieldName ? newFormData[fieldName] = fieldValue : ""
    setAddProductForm(newFormData)
    console.log(addProductForm)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: any = e.target.files;
    setSelectedFiles([...files]);
    console.log(files);
    
  };
  const handleFileCancel = (index: number) => {
    const files = selectedFiles.splice(index, 1)
    setSelectedFiles([...selectedFiles]);
    console.log([...files]);
    
    console.log(selectedFiles,index);
    
  };




  const handleUpload = async() => {
    // const formData = {...addProductForm, images:[...selectedFiles]};
    const formData = new FormData();

    for (const file of selectedFiles) {
      formData.append('file', file);
    }
    formData.append('data', JSON.stringify(addProductForm))
   
    console.log(addProductForm);
    console.log(selectedFiles);
    console.log(formData);
    

    axios
      .post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setMessage(response.data);
        setSelectedFiles([]);
      })
      .catch((error) => {
        console.error(error);
        setMessage('File upload failed.');
      });
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getProducts = async() => {
      try {
        const response: any = await axiosPrivate.get(`/products`, { 
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
            <form action="http://localhost:8000/upload" method="post" encType='multipart/form-data' onSubmit={handleUpload}>
              <Label htmlFor="name">Name: </Label>
              <Input onChange={handleAddProductChange} name="name" className="my-1"/>
              <Label htmlFor="description">Description: </Label>
              <Textarea name="description" className="my-1"/>
              <div className="flex gap-2 justify-between">
                <div>
                  <Label htmlFor="price">Price: </Label>
                  <Input onChange={handleAddProductChange} name="price" type="number" pattern="^[1-9]\d+$" className="my-1" min={0} max={9999}/>
                </div>
                <div>
                  <Label htmlFor="stocks">Stocks: </Label>
                  <Input onChange={handleAddProductChange} name="stocks" type="number" pattern="^[1-9]\d+$" className="my-1" min={0} max={1000}/>
                </div>
                  <div>
                    <Label htmlFor="category">Category: </Label>
                    <Select name="category" onValueChange={(value:string )=>setAddProductForm({...addProductForm, category: value})}>
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
              </div>

              <div className="flex gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                  <Label htmlFor="images">Picture</Label>
                  <Input onChange={handleFileChange} id="images" name="images" type="file" accept=".jpg, .jpeg, .png" multiple/>
                  <div>
                    {selectedFiles.length > 0 && (
                      <div>
                        <h2>Selected Files:</h2>
                        <ul>
                          {selectedFiles.map((file: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined }, index: number ) => (
                            <li key={index} 
                              className="flex justify-between">
                                {file.name} 
                                <X type="button" 
                                onClick={()=>{handleFileCancel(index)}} 
                                className="text-slate-400 hover:text-red-500 cursor-pointer"/>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

              </div>
              <Button type="submit">Submit</Button>
            </form>
            
            <DialogFooter>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
        
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                placeholder="Filter names..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
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

export default Products