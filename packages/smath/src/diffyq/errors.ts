/**
 * Differential equation has not been set up yet
 */
export class NotInitializedError extends Error {
    constructor(dimension: number | null = null) {
        super(`Differential equation and initial conditions ${Number.isFinite(dimension) ? `for dimension ${dimension}` : ''} have not been assigned yet.`);
    }
}
/**
 * Timestep is invalid
 */
export class InvalidTimestepError extends Error {
    constructor() {
        super('Timestep must be positive.');
    }
}
/**
 * Final time is invalid
 */
export class InvalidFinalTimeError extends Error {
    constructor() {
        super('Final time must be in the future.');
    }
}
