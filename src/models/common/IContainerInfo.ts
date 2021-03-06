export interface IContainerInfo {
  containerName: string;
  containerStatus?: string;
  lastStatus?: string;
  image?: string;
  environment?: string;
  mounts?: string;
  commands?: string[];
  ports?: string;
  volumes?: string;
}
