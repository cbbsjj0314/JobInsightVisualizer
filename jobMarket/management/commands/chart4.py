from django.core.management.base import BaseCommand
from jobMarket.services.analysis.processing.process import query_from_primaries
from jobMarket.services.analysis.processing.save import save_aggregation


class Command(BaseCommand):
    help = 'This extracts and inserts info for chart 4'

    def handle(self, *args, **kwargs):
        if len(args) > 1:
            raise TypeError("Too many args")
        self.stdout.write('Extracting from primary tables.')
        query_from_primaries()
        self.stdout.write('Inserting the aggregated result.')
        save_aggregation(args[0] if args else 3)
        self.stdout.write('Job done!')