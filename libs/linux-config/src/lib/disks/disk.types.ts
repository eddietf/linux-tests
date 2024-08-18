//     ID-LINK  the shortest udev /dev/disk/by-id link name
//          ID  udev ID (based on ID-LINK)
//    DISC-ALN  discard alignment offset
//         DAX  dax-capable device
//   DISC-GRAN  discard granularity
//    DISK-SEQ  disk sequence number
//    DISC-MAX  discard max bytes
//   DISC-ZERO  discard zeroes data
//     FSAVAIL  filesystem size available
//     FSROOTS  mounted filesystem roots
//      FSSIZE  filesystem size
//      FSTYPE  filesystem type
//      FSUSED  filesystem size used
//      FSUSE%  filesystem use percentage
//       FSVER  filesystem version
//       GROUP  group name
//        HCTL  Host:Channel:Target:Lun for SCSI
//     HOTPLUG  removable or hotplug device (usb, pcmcia, ...)
//       KNAME  internal kernel device name
//       LABEL  filesystem LABEL
//     LOG-SEC  logical sector size
//     MAJ:MIN  major:minor device number
//      MIN-IO  minimum I/O size
//        MODE  device node permissions
//       MODEL  device identifier
//          MQ  device queues
//        NAME  device name
//      OPT-IO  optimal I/O size
//       OWNER  user name
//   PARTFLAGS  partition flags
//   PARTLABEL  partition LABEL

const ColumnNames:{[key:string]:string} = {
    "alignment" : "alignment",
    "id-link": "idLink",
    "id": "id",
    "disk-aln": "diskAlignment",
    "dax": "dax",
    "disk-gran": "diskGranularity",
    "disk-seq": "diskSequenceNumber",
    "disc-max": "discardMaxBytes",
    "disc-zero": "discardZeroesData",
    "fsavail": "fsSizeAvailable",
    "fsroots": "fsRoots",
    "fssize": "fsSize",
    "fstype": "fsType",
    "fsused": "fsUsed",
    "fsver": "fsVersion",
    "group": "groupName",
    "hctl": "hctl",
    "hotplug": "hotPlug",
    "kname": "kernelName",
    "label": "fsLabel",
    "log-sec": "logicalSectorSize",
    "maj:min": "manjorMinor",
    "min-io": "minimumIOSize",
    "mode": "nodePermissions",
    "model": "model",
    "mq": "queues",
    "name": "name",
    "opt-io": "optimalIOSize",
    "owner": "owner",
    "partflags": "partFlags",
    "partflabel": "partLabel",
    "partn": "partNumber",
    "parttype": "partType",
    "parttypename": "partTypeName",
     
//       PARTN  partition number as read from the partition table
//    PARTTYPE  partition type code or UUID
// PARTTYPENAME  partition type name
//    PARTUUID  partition UUID
//        PATH  path to the device node
//     PHY-SEC  physical sector size
//      PKNAME  internal parent kernel device name
//      PTTYPE  partition table type
//      PTUUID  partition table identifier (usually UUID)
//          RA  read-ahead of the device
//        RAND  adds randomness
//         REV  device revision
//          RM  removable device
//          RO  read-only device
//        ROTA  rotational device
//     RQ-SIZE  request queue size
//       SCHED  I/O scheduler name
//      SERIAL  disk serial number
//        SIZE  size of the device
//       START  partition start offset
//       STATE  state of the device
//  SUBSYSTEMS  de-duplicated chain of subsystems
//  MOUNTPOINT  where the device is mounted
// MOUNTPOINTS  all locations where device is mounted
//        TRAN  device transport type
//        TYPE  device type
//        UUID  filesystem UUID
//      VENDOR  device vendor
//       WSAME  write same max bytes
//         WWN  unique storage identifier
//       ZONED  zone model
//     ZONE-SZ  zone size
//  ZONE-WGRAN  zone write granularity
//    ZONE-APP  zone append max bytes
//     ZONE-NR  number of zones
//   ZONE-OMAX  maximum number of open zones
//   ZONE-AMAX  maximum number of active zones
}

export interface StorageInformation {
    name: string
    major: number
    minor: number
    rm: boolean
    size: number
    readonly: boolean
    type: 'disk' | 'part' | ''
    mountPoints: string[]

    /** alignment offset */
    alignment: string
    /** the shortest udev /dev/disk/by-id link name */
    idLink: string
    /** udev ID (based on ID-LINK) */
    id: string
    /** discard alignment offset */ 
    discAln: string
    /** dax-capable device */
    dax:string 
    /** discard granularity */ 
    diskGran: string

//     DISC-GRAN  
//      DISK-SEQ  disk sequence number
//      DISC-MAX  discard max bytes
//     DISC-ZERO  discard zeroes data
//       FSAVAIL  filesystem size available
//       FSROOTS  mounted filesystem roots
//        FSSIZE  filesystem size
//        FSTYPE  filesystem type
//        FSUSED  filesystem size used
//        FSUSE%  filesystem use percentage
//         FSVER  filesystem version
//         GROUP  group name
//          HCTL  Host:Channel:Target:Lun for SCSI
//       HOTPLUG  removable or hotplug device (usb, pcmcia, ...)
//         KNAME  internal kernel device name
//         LABEL  filesystem LABEL
//       LOG-SEC  logical sector size
//       MAJ:MIN  major:minor device number
//        MIN-IO  minimum I/O size
//          MODE  device node permissions
//         MODEL  device identifier
//            MQ  device queues
//          NAME  device name
//        OPT-IO  optimal I/O size
//         OWNER  user name
//     PARTFLAGS  partition flags
//     PARTLABEL  partition LABEL
//         PARTN  partition number as read from the partition table
//      PARTTYPE  partition type code or UUID
//  PARTTYPENAME  partition type name
//      PARTUUID  partition UUID
//          PATH  path to the device node
//       PHY-SEC  physical sector size
//        PKNAME  internal parent kernel device name
//        PTTYPE  partition table type
//        PTUUID  partition table identifier (usually UUID)
//            RA  read-ahead of the device
//          RAND  adds randomness
//           REV  device revision
//            RM  removable device
//            RO  read-only device
//          ROTA  rotational device
//       RQ-SIZE  request queue size
//         SCHED  I/O scheduler name
//        SERIAL  disk serial number
//          SIZE  size of the device
//         START  partition start offset
//         STATE  state of the device
//    SUBSYSTEMS  de-duplicated chain of subsystems
//    MOUNTPOINT  where the device is mounted
//   MOUNTPOINTS  all locations where device is mounted
//          TRAN  device transport type
//          TYPE  device type
//          UUID  filesystem UUID
//        VENDOR  device vendor
//         WSAME  write same max bytes
//           WWN  unique storage identifier
//         ZONED  zone model
//       ZONE-SZ  zone size
//    ZONE-WGRAN  zone write granularity
//      ZONE-APP  zone append max bytes
//       ZONE-NR  number of zones
//     ZONE-OMAX  maximum number of open zones
//     ZONE-AMAX  maximum number of active zones
}


export interface PartitionInformation extends StorageInformation {
    partitionType: string
}

export interface DiskInformation extends StorageInformation {
    partitions: PartitionInformation[]
}
