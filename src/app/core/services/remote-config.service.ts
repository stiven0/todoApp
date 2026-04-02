import { Injectable } from '@angular/core';
import { initializeApp, type FirebaseApp, getApps, getApp } from 'firebase/app';
import { fetchAndActivate, getRemoteConfig, getValue, type RemoteConfig } from 'firebase/remote-config';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RemoteConfigService {

    private static readonly DARK_MODE_FLAG_KEY = 'enable_dark_mode';
    private firebaseApp?: FirebaseApp;
    private remoteConfig?: RemoteConfig;

    private readonly firebaseConfig = {
        apiKey: environment.apiKey,
        authDomain: environment.authDomain,
        storageBucket: environment.storageBucket,
        messagingSenderId: environment.messagingSenderId,
        projectId: environment.projectId,
        appId: environment.appId
    };

    async init(): Promise<void> {
        this.firebaseApp = getApps().length ? getApp() : initializeApp(this.firebaseConfig);
        this.remoteConfig = getRemoteConfig(this.firebaseApp);
                this.remoteConfig.settings = {
            fetchTimeoutMillis: 10000,
            minimumFetchIntervalMillis: environment.production ? 3600000 : 0
        };

        this.remoteConfig.defaultConfig = {
            [RemoteConfigService.DARK_MODE_FLAG_KEY]: false
        };

        try {
            await fetchAndActivate(this.remoteConfig);
        } catch (error) {
            console.warn('Remote Config fetch failed, using defaults.', error);
        }

        const enableDarkMode = this.getDarkModeFlag();
        console.log('[RemoteConfig] enable_dark_mode:', enableDarkMode);
        this.applyDarkMode(enableDarkMode);
    }

    private getDarkModeFlag(): boolean {
        if (!this.remoteConfig) {
            return false;
        }

        const value = getValue(this.remoteConfig, RemoteConfigService.DARK_MODE_FLAG_KEY);
        return value.asBoolean();
    }

    private applyDarkMode(isEnabled: boolean): void {
        document.documentElement.classList.toggle('ion-palette-dark', isEnabled);
    }

}
