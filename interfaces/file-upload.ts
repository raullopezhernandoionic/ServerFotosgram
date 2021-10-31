export interface FileUpload {
    name: String,
    data: any,
    encoding: string,
    tempFilePath: string,
    truncated: boolean,
    mimetype: string,
    mv:Function

}