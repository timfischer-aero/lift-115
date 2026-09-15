
interface HeaderProps {
    headerText: string;
}
import {
  SidebarTrigger, 
} from '@aeroflow/af-components';

export function PageHeader({headerText}: HeaderProps) {

    return (
        <header className="flex items-center gap-2 px-2 py-4 border-b border-gray-200">
            <SidebarTrigger />
            <h1 className="font-semibold">{headerText}</h1>
        </header>
    );
}