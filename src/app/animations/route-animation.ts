import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), {
      optional: true,
    }),
    group([
      query(
        ':enter',
        [
          style({
            transform: 'translateX(100%) scale(0.8)',
          }),
          animate(
            '0.5s ease-in-out',
            style({
              transform: 'translateX(0%) scale(1)',
            })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({
            transform: 'scale(1)',
          }),
          animate(
            '0.5s ease-in-out',
            style({
              transform: 'scale(0.8)',
            })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

export const zoomInAnimation = trigger('zoomInAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }),
    animate(
      '1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      style({ transform: 'scale(1)', opacity: 1 })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1 }),
    animate(
      '1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      style({ transform: 'scale(0.5)', opacity: 0 })
    ),
  ]),
]);

export const offcanvasTopAnimation = trigger('offcanvasTopAnimation', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate(
      '0.5s cubic-bezier(0.25, 0.4, 0.55, 1.4)',
      style({ transform: 'translateY(0%)' })
    ),
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0%)' }),
    animate(
      '0.5s cubic-bezier(0.25, 0.4, 0.55, 1.4)',
      style({ transform: 'translateY(-100%)' })
    ),
  ]),
]);
