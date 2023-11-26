declare global {
	interface CustomEnv {
		APP_NAME?: string;
	}

	namespace Deno {
		interface Env {
			delete(key: keyof CustomEnv): void;
			get<T extends keyof CustomEnv>(key: T): CustomEnv[T] | undefined;
			has(key: keyof CustomEnv): boolean;
			set<T extends keyof CustomEnv>(key: T, value: CustomEnv[T]): void;
		}
	}
}

export {};
