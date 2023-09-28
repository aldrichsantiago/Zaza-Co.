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
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
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
import { DialogClose } from "@radix-ui/react-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Label } from "@/components/ui/label"


const formSchema = z.object({
  firstName: z.string().min(2, {message: "First name must be at least 2 characters.",}),
  lastName: z.string().min(2, {message: "Last name must be at least 2 characters.",}),
  email: z.string().email({message: "Please enter a valid email",}),
  username: z.string().min(4, {message: "Username must be at least 4 characters.",}).max(16, {message: "Username should not exceed 16 characters."}),
  password: z.string().min(8, {message: "Password must be at least 8 characters.",}),
  confirmPassword: z.string().min(4, {message: "Password must be at least 8 characters.",}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirm"], // path of error
});

 
export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  role: "admin" | "client",
  isActivated: boolean,
  isDeleted: boolean,
}
 
export const columns: ColumnDef<User>[] = [
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
      const user = row.original

      const navigate = useNavigate();
      const [editUserForm, setEditUserForm] = useState({})
      const { toast } = useToast()

      const handleEditUserSubmit = async(id: string) => {
        axios
          .patch('/edit/user/'+ id, editUserForm)
          .then((response) => {
            console.log(response.data);
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
      const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const fieldName = e.target.getAttribute("name");
        const fieldValue = e.target.value;
        const newFormData: any = { ...editUserForm };
        fieldName ? newFormData[fieldName] = fieldValue : ""
        setEditUserForm(newFormData)
        console.log(editUserForm)
      }

      const handleDelete = async(id:string) => {
        try {
          const response = axios.patch('/delete/user/'+id)
          console.log(response);
          navigate(0);
        } catch (error) {
          console.log(error);
        }
        toast({
          variant: "default",
          title: "User has been deleted."
        })
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
              <DialogTrigger className="hover:bg-slate-100 w-full px-2 py-1.5 text-sm text-left rounded-sm transition-colors">Edit User</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit user</DialogTitle>
                </DialogHeader>
                <form  method="patch" onSubmit={()=>handleEditUserSubmit(user.id)}>
                  <div className="flex gap-2 justify-between">
                    <div className="w-2/4">
                    <Label htmlFor="firstName">First Name: </Label>
                    <Input onChange={handleEditUserChange} name="firstName" className="my-1" defaultValue={user.firstName}/>
                    </div>

                    <div className="w-2/4">
                    <Label htmlFor="lastName">Last Name: </Label>
                    <Input onChange={handleEditUserChange} name="lastName" className="my-1" defaultValue={user.lastName}/>
                    </div>
                 
                  </div>
                    <Label htmlFor="email">Email: </Label>
                    <Input onChange={handleEditUserChange} name="email" className="my-1" defaultValue={user.email}/>
                  <div className="flex gap-2 justify-between">
                    <div className="w-1/2">
                      <Label htmlFor="username">Username: </Label>
                      <Input onChange={handleEditUserChange} name="username" className="my-1" defaultValue={user.username}/>
                    </div>
                    <div className="w-1/2">
                      <Label htmlFor="role">Role: </Label>
                      <Select name="role" defaultValue={user.role} onValueChange={(value:string )=>setEditUserForm({...editUserForm, role: value})}>
                        <SelectTrigger className="w-[225px] my-1">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="font-medium" value="admin">Admin</SelectItem>
                          <SelectItem className="font-medium" value="client">Client</SelectItem>
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
            <DropdownMenuItem>Change password</DropdownMenuItem>
            <DropdownMenuSeparator />
            
            <Dialog>
              <DialogTrigger className="hover:bg-red-500 hover:text-white w-full p-1.5 text-sm text-left rounded-sm transition-colors">Delete account</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete this account?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  This action cannot be undone
                </DialogDescription>
                <DialogFooter>
                  <DialogClose>
                    <Button aria-label="Close" variant={"outline"}>Cancel</Button>
                  </DialogClose>
                  <Button onClick={()=>handleDelete(user.id)} variant={"destructive"}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const Users = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([])
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    axios.post(`${import.meta.env.VITE_API_URL}/register`, values)
     .then(()=>{
      navigate(0);
      toast({
        description: "You've successfully created an account",
      })
    })
     .catch (error => {
      console.log(error.response.data.message)
      toast({
        description: error.response.data.message,
        variant: "destructive"
      })
    });
    console.log(values, `${import.meta.env.VITE_API_URL}/register`)
  }

  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async() => {
      try {
        const response: any = await axiosPrivate.get(`/users`, { 
          signal: controller.signal
        });
        setData(response.data)

        isMounted && setData(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();

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
          Users
        </h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className='text-3xl font-medium'>Create an Account</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 ">
                <div className="flex flex-wrap justify-between">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className='w-1/2 px-1'>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage className="font-normal text-xs"/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className='w-1/2 px-1'>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage className="font-normal text-xs"/>
                    </FormItem>
                  )}
                />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} type='email'/>
                      </FormControl>
                      <FormMessage className="font-normal text-xs"/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field}/>
                      </FormControl>
                      <FormMessage className="font-normal text-xs"/>
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap justify-between">
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className='w-1/2 px-1'>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Password" {...field} type='password'/>
                        </FormControl>
                        <FormMessage className="font-normal text-xs"/>
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className='w-1/2 px-1'>
                        <FormLabel>&nbsp;</FormLabel>
                        <FormControl>
                            <Input placeholder="Confirm password" {...field} type='password'/>
                        </FormControl>
                        <FormMessage className="font-normal text-xs"/>
                        </FormItem>
                    )}
                    />
                </div>
                <Button type="submit" className='w-full my-72'>Register</Button>
              </form>
            </Form>
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

export default Users