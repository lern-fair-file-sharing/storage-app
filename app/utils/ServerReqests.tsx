import { FolderCardType, FileCardType, FileListType } from "../types/FileTypes";

const myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Authorization", "Basic dGVzdHVzZXI6MTIzNA==");
myHeaders.append("Cookie", "cookie_test=test; nc_sameSiteCookielax=true; nc_sameSiteCookiestrict=true; oc_sessionPassphrase=CiAfDImx%2B6zTIOvuv%2BOLXvLAfgd4EHh9VojUTooSI43RBwjQ00JoR884lKxyQUPRoGf21SqCCWTftnnsy3HOYhTEmlUE0lAom8qdV2xY6w1JJVJaTW%2BqG20Fd7jDqrA3; ocetqxf0qy6c=ec7939819be7340d23717f5a5ec29421");

const raw = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n <d:propfind xmlns:d=\"DAV:\" xmlns:oc=\"http://owncloud.org/ns\" xmlns:nc=\"http://nextcloud.org/ns\">\r\n   <d:prop>\r\n     <d:getlastmodified/>\r\n     <d:getcontentlength/>\r\n     <d:getcontenttype/>\r\n     <oc:permissions/>\r\n     <d:resourcetype/>\r\n     <d:getetag/>\r\n     <oc:fileid />\r\n     <oc:permissions />\r\n     <oc:size />\r\n     <oc:tags />\r\n     <d:getcontentlength />\r\n     <nc:has-preview />\r\n     <oc:favorite />\r\n     <oc:comments-unread />\r\n     <oc:owner-display-name />\r\n     <oc:share-types />\r\n   </d:prop>\r\n </d:propfind>";

const requestOptions = {
  method: "PROPFIND",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

// This function is used to get the list of files and folders from the server
// The function returns a promise that resolves to a FileListType object
export const getFileList = async (): Promise<FileListType> => {
    fetch("http://localhost:8080/remote.php/dav/files/testuser/")
        .then((response) => console.log(response.text()))
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    return {
        files: [],
        folders: []
    };
}