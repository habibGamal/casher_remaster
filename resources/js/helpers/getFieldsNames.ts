export default function getFieldsNames(items: any) {
    let fieldsNames: string[] = [];
    items.forEach((item: any) => {
        if (item.name) fieldsNames.push(item.name);
    });
    return fieldsNames;
}
