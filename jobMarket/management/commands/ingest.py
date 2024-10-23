from django.core.management.base import BaseCommand
from django.conf import settings
from jobMarket.services.ingestion.ingest import *
import os

class Command(BaseCommand):
    help = 'This extracts and inserts info for chart 4'

    def handle(self, *args, **kwargs):

        if len(args) > 1:
            raise TypeError("Too many args")
        
        self.stdout.write('JSON -> Primary tables job started.')

        # path
        pending_data_path = os.path.join(settings.BASE_DIR, args[0]) if args else os.path.join(settings.BASE_DIR, 'data/pending')
        files = os.listdir(pending_data_path)

        # start
        if len(files) > 0:
            self.stdout.write('Found some hanging jobs.')
            for file in files:
                ingest(os.path.join(pending_data_path, file))
                self.stdout.write(f'Ingestion for {file} done.')
            self.stdout.write('All jobs done.')
        else:
            self.stdout.write(f'No JSON found in {pending_data_path}.')
    
        
