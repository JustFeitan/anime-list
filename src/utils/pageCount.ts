
export const pageCount = (totalCount: number, limit: number = 15) => {
        return Math.ceil(totalCount / limit);
}
