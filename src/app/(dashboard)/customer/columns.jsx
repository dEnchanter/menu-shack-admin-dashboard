// columns.js
import { FileEditIcon, DeleteIcon } from "@/components/Icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateAndTime } from "@/helper/formatDateTime";

export const columns = [
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
  // {
  //   header: 'Action',
  //   cell: () => (
  //     <div className="flex space-x-2">
  //       <Button variant="ghost"><FileEditIcon className="text-gray-500" /></Button>
  //       <Button variant="ghost"><DeleteIcon className="text-gray-500" /></Button>
  //     </div>
  //   ),
  // },
];