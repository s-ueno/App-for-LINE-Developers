import {
    BlobServiceClient,
    ContainerClient,
    StorageSharedKeyCredential,
    BlobDownloadResponseModel
} from "@azure/storage-blob";
import fs = require("fs");

export class BlobStorageService {

    constructor(public ConnectionString?: string) {
        if (!ConnectionString) {
            ConnectionString = process.env["SIS.AzureBlobStorage"];　//接続先
        }
        this.BlobServiceClient = BlobServiceClient.fromConnectionString(ConnectionString);
    }
    public BlobServiceClient: BlobServiceClient;
    public ContainerName: string;
    public ContainerClient: ContainerClient;
    public static CreateAsync(containerName: string = "sgpayblobcontainer") {
        const svc = new BlobStorageService();
        svc.ContainerName = containerName;
        svc.ContainerClient = svc.BlobServiceClient.getContainerClient(containerName);
        return svc;
    }

    /**
     * GetFileAsync
     * fullName : string     
    */
    public async GetFileAsync(blobName: string) {
        var client = this.ContainerClient.getBlobClient(blobName);
        return await client.downloadToBuffer();
    }
}