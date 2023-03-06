import { useState } from "react";

const useTableController = (defaultValueForSelect: string) => {
    const [search, setSearch] = useState<string>('');
    const [attribute, setAttribute] = useState<string>('name');
    const [searchMode, setSearchMode] = useState<boolean>(false);
    const exitSearchMode = () => setSearchMode(false);
    const enterSearchMode = () => setSearchMode(true);
    return { search, setSearch, attribute, setAttribute, exitSearchMode, enterSearchMode, searchMode, defaultValueForSelect }
}

export default useTableController;