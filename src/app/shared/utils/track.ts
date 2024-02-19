export class TrackBy {
    trackByFn(index: number, item: any): number {
        return item.id;
      }
}