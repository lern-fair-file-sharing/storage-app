import { FolderCardType, FileCardType, FileListType } from "../types/FileTypes";
import { PropfindResponseType, PropSearchResponseType } from "../types/ResponseTypes";

var parseString = require('react-native-xml2js').parseString;
const machineIP = "192.168.178.21";
const machinePort = "8080";
const machineURL = "http://" + machineIP + ":" + machinePort;
const user = "testuser";
const userpath = "/files/" + user;


// This function is used to get the list of files and folders from the server
// The function returns a promise that resolves to a FileListType object
export const getFolderContent = async (directory: string): Promise<FileListType | void> => {
    const requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "text/plain");
    requestHeaders.append("Authorization", "Basic dGVzdHVzZXI6MTIzNA==");
    requestHeaders.append("Cookie", "cookie_test=test; nc_sameSiteCookielax=true; nc_sameSiteCookiestrict=true; oc_sessionPassphrase=CiAfDImx%2B6zTIOvuv%2BOLXvLAfgd4EHh9VojUTooSI43RBwjQ00JoR884lKxyQUPRoGf21SqCCWTftnnsy3HOYhTEmlUE0lAom8qdV2xY6w1JJVJaTW%2BqG20Fd7jDqrA3; ocetqxf0qy6c=ec7939819be7340d23717f5a5ec29421");

    const raw = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n <d:propfind xmlns:d=\"DAV:\" xmlns:oc=\"http://owncloud.org/ns\" xmlns:nc=\"http://nextcloud.org/ns\">\r\n   <d:prop>\r\n     <d:getlastmodified/>\r\n     <d:getcontentlength/>\r\n     <d:getcontenttype/>\r\n     <oc:permissions/>\r\n     <d:resourcetype/>\r\n     <d:getetag/>\r\n     <oc:fileid />\r\n     <oc:permissions />\r\n     <oc:size />\r\n     <oc:tags />\r\n     <d:getcontentlength />\r\n     <nc:has-preview />\r\n     <oc:favorite />\r\n     <oc:comments-unread />\r\n     <oc:owner-display-name />\r\n     <oc:share-types />\r\n   </d:prop>\r\n </d:propfind>";

    const requestOptions = {
        method: "PROPFIND",
        headers: requestHeaders,
        body: raw,
        redirect: "follow"
    };

    let fileList: FileListType = {
        folders: [],
        files: []
    };

    return fetch(machineURL + directory, requestOptions as RequestInit)
        .then((response) => response.text())
        .then((result) => {
            parseString(result, function (err: any, result: any) {
                result as PropfindResponseType;
                result["d:multistatus"]["d:response"].forEach((element: any) => {
                    let path = element["d:href"][0];

                    if (path.endsWith("/")) {
                        if (path != directory) {
                            let folder: FolderCardType = {
                                folderName: path.substring(
                                    path.lastIndexOf("/", path.lastIndexOf("/") - 1) + 1,
                                    path.lastIndexOf("/")
                                ),
                                folderURL: path
                            };
                            fileList.folders.push(folder);
                        }
                    }
                    else {
                        let file: FileCardType = {
                            fileName: path.substring(path.lastIndexOf("/") + 1),
                            fileType: element["d:propstat"][0]["d:prop"][0]["d:getcontenttype"][0],
                            fileURL: path,
                            tags: element["d:propstat"][0]["d:prop"][0]["oc:tags"][0].split(","),
                            lastModified: element["d:propstat"][0]["d:prop"][0]["d:getlastmodified"][0]
                        };
                        fileList.files.push(file);
                    }

                });
            });
            //console.log(fileList);
            return fileList
        })
        .catch((error) => console.error(error));
};

export const searchLatestFiles = async(): Promise<FileCardType[] | void> => {
    const requestHeaders = new Headers();
    requestHeaders.append("content-Type", "text/xml");
    requestHeaders.append("Authorization", "Basic dGVzdHVzZXI6MTIzNA==");
    requestHeaders.append("Cookie", "nc_sameSiteCookielax=true; nc_sameSiteCookiestrict=true; oc_sessionPassphrase=CiAfDImx%2B6zTIOvuv%2BOLXvLAfgd4EHh9VojUTooSI43RBwjQ00JoR884lKxyQUPRoGf21SqCCWTftnnsy3HOYhTEmlUE0lAom8qdV2xY6w1JJVJaTW%2BqG20Fd7jDqrA3; ocetqxf0qy6c=ec7939819be7340d23717f5a5ec29421");

    const raw = "<d:searchrequest xmlns:d=\"DAV:\" xmlns:oc=\"http://owncloud.org/ns\">\r\n     <d:basicsearch>\r\n         <d:select>\r\n             <d:prop>\r\n                 <oc:fileid/>\r\n                 <d:displayname/>\r\n                 <d:getcontenttype/>\r\n                 <d:getetag/>\r\n                 <oc:size/>\r\n                 <oc:tags/>\r\n                 <d:getlastmodified/>\r\n                 <d:resourcetype/>\r\n             </d:prop>\r\n         </d:select>\r\n         <d:from>\r\n             <d:scope>\r\n                 <d:href>" + userpath + "</d:href>\r\n                 <d:depth>infinity</d:depth>\r\n             </d:scope>\r\n         </d:from>\r\n         <d:where>\r\n             <d:not>\r\n                 <d:is-collection/>\r\n             </d:not>\r\n         </d:where>\r\n         <d:orderby>\r\n            <d:order>\r\n                <d:prop>\r\n                    <d:getlastmodified/>\r\n                </d:prop>\r\n                <d:descending/>\r\n             </d:order>\r\n         </d:orderby>\r\n         <d:limit>\r\n           <d:nresults>20</d:nresults>\r\n         </d:limit>\r\n    </d:basicsearch>\r\n</d:searchrequest>";

    const requestOptions = {
        method: "SEARCH",
        headers: requestHeaders,
        body: raw,
        redirect: "follow"
    };

    let fileList: FileCardType[] = [];

    return fetch(machineURL +"/remote.php/dav", requestOptions as RequestInit)
        .then((response) => response.text())
        .then((result) => {
            parseString(result, function (err: any, result: any) {
                result as PropSearchResponseType;
                result["d:multistatus"]["d:response"].forEach((element: any) => {
                    let file: FileCardType = {
                        fileName: element["d:propstat"][0]["d:prop"][0]["d:displayname"][0],
                        fileType: element["d:propstat"][0]["d:prop"][0]["d:getcontenttype"][0],
                        fileURL: element["d:href"][0],
                        tags: element["d:propstat"][0]["d:prop"][0]["oc:tags"][0].split(","),
                        lastModified: element["d:propstat"][0]["d:prop"][0]["d:getlastmodified"][0]
                    };
                    fileList.push(file);
                });
            });
            //console.log(fileList);
            return fileList;
        })
        .catch((error) => console.error(error));
};  