export interface SnapDResponse<Type = 'string' | Buffer> {
    success: boolean
    status: number
    body?: Type
  }
  
  export interface SnapDClientConfig {
    version:number
    port:number
  }
  
  export interface SnapUser {
    email: string
    id: number
    username: string
  }

  export interface CreateRecoveryRequest {
    label: string
    testSystem: boolean
    markDefault: boolean
    validationSets: string[],
    offline: boolean,
  }

  export interface SnapWarning {
    /** message for this warning */
    message: string
    /** the first time one of these messages was created in RFC3339 UTC format */
    firstSeen: string
    /** the last time one of these messages was created in RFC3339 UTC format */
    lastSeen: Date
    /** the last time one of these messages was shown to the user in RFC3339 UTC format (optional) */
    lastShown?: Date
    /** how much time since one of these was last seen should we drop the message (optional) */
    deleteAfter?: Date
    /** how much time since one of these was last shown should we repeat it (optional) */
    repeatAfter?: Date
  }

  export interface SnapSystemOSInfo {
    /**  a unique ID for each OS  */
    id: string
    /** a string describing the version of this OS */
    versionId: string
  }
  
  export interface SnapSystemInfoLocation {
      /** directory where snaps are mounted in */
    snapMountDir: string
    /** directory where snap apps are run from */
    snapBinDir: string
  }

  export interface SnapSystemInfoRefresh {
    /** last time a refresh was performed (optional) */
    last: Date
    /** next time a refresh will be performed */
    next: Date
    /** time that refreshes will be applied (optional, if missing then applied immediately) */
    hold: Date
    /** times that updates are checked for */
    timer: string
    /** schedule that updates are being checked with (legacy, replaced with timer) */
    schedule: string
  }

  export interface SnapSystemInfoFeature {
    supported: boolean
    enabled: boolean
    unsupportedReason?: string
  }

  export interface SnapSystemInfo {
    /** the CPU architecture of the host system */
    architecture: string
    /** a unique ID for this build of snapd */
    buildId: string
    /** the level of confinement the system supports; either strict or partial */
    confinement: 'strict' | 'partial'
    /** dict mapping snapd feature names to information about whether that feature is supported and/or enabled */
    features: {[key:string]:SnapSystemInfoFeature}
    /** version of the kernel on this system */
    kernelVersion: string
    /** dict containing directory locations used by snapd (see below) */
    locations: SnapSystemInfoLocation
    /** true if able to manage user accounts (?) */
    managed: boolean
    /** true if not running on a fully snap managed system */
    onClassic: boolean
    /** object containing release information as sourced from /etc/os-release. Contains id which is a unique ID for each OS and version-id which is a string describing the version of this OS */
    osRelease: SnapSystemOSInfo
    /** dict containing refresh times (optional, see below) */
    refresh: SnapSystemInfoRefresh
    /**  dict containing information information about features supported by various components of the sandbox */
    sandboxFeatures: {[key:string]:string[]}
    /** the core series in use */
    series: string,
    /** the mode under which snapd is operating; either run, recover, or install (absent on pre-UC20 systems) */
    systemMode: 'run' | 'recover' | 'install'
    /** the version of snapd */
    version: string
}

  