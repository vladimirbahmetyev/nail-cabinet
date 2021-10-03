import {Pipe, PipeTransform} from "@angular/core";
import {clientMock} from "../../clients-page/mockFile";

@Pipe({
  name: 'clientFilter'
})
export class ClientFilterPipe implements PipeTransform{
  transform(clients: clientMock[], search: string): clientMock[] {
    if(!search.trim()) {
      return clients;
    }
    return clients.filter(client =>
      client?.name?.toLowerCase().indexOf(search.toLowerCase()) !== -1
      || (client?.instagram && client?.instagram.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      || (client?.phone && client?.phone.toLowerCase().indexOf(search.toLowerCase()) !== -1));
  }
}
