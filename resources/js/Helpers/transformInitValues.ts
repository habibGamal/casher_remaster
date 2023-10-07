import { FormSchema, FormSchemaField } from "./formGenerator";

export default function transformInitValues(
    formSchema: FormSchema,
    initValues?: any
) {
    if (!initValues) return undefined;

    const newInitValues = { ...initValues };

    const keys = Object.keys(initValues);
    console.log(newInitValues);
    keys.forEach((key) => {
        const schema = formSchema[key] as FormSchemaField;
        if (schema && newInitValues[key] !== null) {
            if (schema.type === "radio") {
                newInitValues[key] = newInitValues[key].toString();
            }
            if (schema.type === "select_search") {
                newInitValues[key] = newInitValues[key.replace("_id", "")];
                newInitValues[key].label = newInitValues[key]?.name;
            }
        }
    });

    return newInitValues;
}
