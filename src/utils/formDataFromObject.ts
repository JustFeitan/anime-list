export function formDataFromObject<T>(object: T) {
    const newFormData = new FormData();

    for (const field of Object.keys(object) as (keyof T)[]) {
        const value = object[field as keyof T];
        if (value instanceof File) {
            newFormData.append(field.toString(), value, (value as File).name);
        } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol') {
            newFormData.append(field.toString(), value.toString());
        }
    }
    return newFormData;
}
